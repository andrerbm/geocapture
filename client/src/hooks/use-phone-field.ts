import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { CountryCode } from "libphonenumber-js";
import {
  countries,
  formatPhoneNumber,
  getMaxLength,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "@/lib/phone-utils";

export function usePhoneField(
  initialCountry: CountryCode,
  onValidSearch: (fullNumber: string) => void
) {
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [value, setValue] = useState("");
  const [userSelectedCountry, setUserSelectedCountry] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // ✅ novo: garante que só mostra inválido após terminar uma validação
  const [validationDone, setValidationDone] = useState(false);

  const previousDigitsRef = useRef<string>("");
  const previousFormattedRef = useRef<string>("");

  const validCountrySet = useMemo(
    () => new Set<CountryCode>(countries.map((c) => c.code as CountryCode)),
    []
  );

  const dialCodeByCountry = useMemo(
    () =>
      new Map<CountryCode, string>(
        countries.map((c) => [c.code as CountryCode, c.dialCode])
      ),
    []
  );

  const resetInput = useCallback(() => {
    setValue("");
    setIsValid(false);
    setIsValidating(false);
    setValidationDone(false);
    previousDigitsRef.current = "";
    previousFormattedRef.current = "";
  }, []);

  useEffect(() => {
    if (!userSelectedCountry && initialCountry !== country) {
      setCountry(initialCountry);
      resetInput();
    }
  }, [initialCountry, userSelectedCountry, country, resetInput]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const previousFormatted = previousFormattedRef.current;

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
    [country, resetInput]
  );

  const handleCountryChange = useCallback(
    (newCountry: string) => {
      const next = newCountry.toUpperCase() as CountryCode;
      if (!validCountrySet.has(next)) return;

      setUserSelectedCountry(true);
      setCountry(next);

      setValue((prev) => {
        const digitsOnly = prev.replace(/\D/g, "");
        if (!digitsOnly) {
          previousDigitsRef.current = "";
          previousFormattedRef.current = "";
          setIsValid(false);
          setIsValidating(false);
          setValidationDone(false);
          return "";
        }

        const reformatted = formatPhoneNumber(digitsOnly, next);
        previousDigitsRef.current = digitsOnly;
        previousFormattedRef.current = reformatted;

        // vai revalidar quando atingir maxDigits
        setIsValidating(false);
        setValidationDone(false);

        return reformatted;
      });
    },
    [validCountrySet]
  );

  const digitsOnly = useMemo(() => value.replace(/\D/g, ""), [value]);
  const digitCount = digitsOnly.length;
  const maxDigits = useMemo(() => getMaxLength(country), [country]);

  useEffect(() => {
    // Se ainda não chegou no tamanho esperado: não valida e não mostra erro
    if (digitCount === 0 || digitCount < maxDigits) {
      setIsValidating(false);
      setValidationDone(false);
      return;
    }

    // ✅ assim que atingir maxDigits, já bloqueia feedback de inválido
    setIsValidating(true);
    setValidationDone(false);

    const id = window.setTimeout(() => {
      const ok = isValidPhoneNumber(value, country);
      setIsValid(ok);
      setIsValidating(false);
      setValidationDone(true); // ✅ libera mostrar inválido caso seja false
    }, 400);

    return () => window.clearTimeout(id);
  }, [value, country, digitCount, maxDigits]);

  const handleSearch = useCallback(() => {
    if (!digitsOnly || !isValid) return;

    try {
      const parsed = parsePhoneNumberWithError(digitsOnly, country);
      if (parsed.isValid()) {
        onValidSearch(parsed.formatInternational());
        return;
      }
    } catch {
      // ignore
    }

    const dial = dialCodeByCountry.get(country);
    onValidSearch(dial ? `${dial} ${digitsOnly}` : value);
  }, [digitsOnly, isValid, country, onValidSearch, dialCodeByCountry, value]);

  // ✅ só mostra inválido quando:
  // - digitCount >= maxDigits
  // - NÃO está validando
  // - a validação daquele estado já terminou (validationDone)
  // - e é inválido
  const showInvalid =
    digitCount >= maxDigits && validationDone && !isValidating && !isValid;

  return {
    country,
    value,
    isValid,
    isValidating,
    showInvalid,
    digitCount,
    maxDigits,
    handleChange,
    handleCountryChange,
    handleSearch,
  };
}
