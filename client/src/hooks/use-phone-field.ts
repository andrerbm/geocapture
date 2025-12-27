import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { CountryCode } from "libphonenumber-js";
import {
  countries,
  formatPhoneNumber,
  getMaxLength,
  parsePhoneNumberWithError,
} from "@/lib/phone-utils";

export function usePhoneField(
  initialCountry: CountryCode,
  onValidSearch: (fullNumber: string) => void
) {
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [value, setValue] = useState("");
  const [userSelectedCountry, setUserSelectedCountry] = useState(false);

  // ✅ erro só depois que o usuário tenta localizar
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitInvalid, setSubmitInvalid] = useState(false);

  const previousDigitsRef = useRef<string>("");
  const previousFormattedRef = useRef<string>("");

  const validCountrySet = useMemo(
    () => new Set<CountryCode>(countries.map((c) => c.code as CountryCode)),
    []
  );

  const resetInput = useCallback(() => {
    setValue("");
    setSubmitAttempted(false);
    setSubmitInvalid(false);
    previousDigitsRef.current = "";
    previousFormattedRef.current = "";
  }, []);

  useEffect(() => {
    if (!userSelectedCountry && initialCountry !== country) {
      setCountry(initialCountry);
      resetInput();
    }
  }, [initialCountry, userSelectedCountry, country, resetInput]);

  const clearSubmitError = useCallback(() => {
    // ✅ assim que o usuário mexe, tira o vermelho (ele está corrigindo)
    setSubmitAttempted(false);
    setSubmitInvalid(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const previousFormatted = previousFormattedRef.current;

      clearSubmitError();

      if (inputValue === "") {
        resetInput();
        return;
      }

      const currentDigits = inputValue.replace(/\D/g, "");
      const previousDigits = previousDigitsRef.current;

      const isDeleting =
        inputValue.length < previousFormatted.length ||
        currentDigits.length < previousDigits.length;

      if (isDeleting) {
        // ✅ apagou máscara (")", espaço etc.) e os dígitos não mudaram
        let nextDigits = currentDigits;
        if (currentDigits === previousDigits) {
          nextDigits = previousDigits.slice(0, -1);
        }

        if (!nextDigits) {
          resetInput();
          return;
        }

        const formatted = formatPhoneNumber(nextDigits, country);
        setValue(formatted);
        previousDigitsRef.current = nextDigits;
        previousFormattedRef.current = formatted;
        return;
      }

      const formatted = formatPhoneNumber(inputValue, country);
      setValue(formatted);
      previousDigitsRef.current = formatted.replace(/\D/g, "");
      previousFormattedRef.current = formatted;
    },
    [country, resetInput, clearSubmitError]
  );

  const handleCountryChange = useCallback(
    (newCountry: string) => {
      const next = newCountry.toUpperCase() as CountryCode;
      if (!validCountrySet.has(next)) return;

      setUserSelectedCountry(true);
      setCountry(next);
      clearSubmitError();

      setValue((prev) => {
        const digitsOnly = prev.replace(/\D/g, "");
        if (!digitsOnly) {
          previousDigitsRef.current = "";
          previousFormattedRef.current = "";
          return "";
        }

        const reformatted = formatPhoneNumber(digitsOnly, next);
        previousDigitsRef.current = digitsOnly;
        previousFormattedRef.current = reformatted;
        return reformatted;
      });
    },
    [validCountrySet, clearSubmitError]
  );

  const digitsOnly = useMemo(() => value.replace(/\D/g, ""), [value]);
  const digitCount = digitsOnly.length;
  const maxDigits = useMemo(() => getMaxLength(country), [country]);

  // ✅ “inválido” só aparece se:
  // - o usuário tentou localizar
  // - e o submit deu inválido
  const showInvalid = submitAttempted && submitInvalid;

  const handleSearch = useCallback(() => {
    setSubmitAttempted(true);

    if (!digitsOnly) {
      setSubmitInvalid(true);
      return;
    }

    try {
      const parsed = parsePhoneNumberWithError(digitsOnly, country);

      // ✅ 1) Bloqueia números incompletos (ex: 6-8 dígitos no BR)
      // isPossible() verifica se o comprimento está dentro do range esperado
      if (!parsed.isPossible()) {
        setSubmitInvalid(true);
        return;
      }

      // ✅ 2) Se for possível (comprimento correto), aceita
      // isValid() é muito rigoroso e rejeita números "fake" como 11912345678
      // Para um MVP, isPossible() é suficiente para garantir que o número
      // tem o comprimento correto para o país
      setSubmitInvalid(false);
      onValidSearch(parsed.formatInternational());
    } catch {
      // ✅ Sem fallback que "deixa passar"
      setSubmitInvalid(true);
    }
  }, [digitsOnly, country, onValidSearch]);

  return {
    country,
    value,
    digitCount,
    maxDigits,
    showInvalid,
    handleChange,
    handleCountryChange,
    handleSearch,
  };
}
