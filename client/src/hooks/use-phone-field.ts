import { useState, useCallback, useEffect, useRef } from "react";
import { CountryCode } from "libphonenumber-js";
import {
  countries,
  formatPhoneNumber,
  getMaxLength,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "@/lib/phone-utils";

export function usePhoneField(
  initialCountry: CountryCode,
  onValidSearch: (fullNumber: string) => void
) {
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [value, setValue] = useState("");
  const [userSelectedCountry, setUserSelectedCountry] = useState(false);
  const previousDigitsRef = useRef<string>("");
  const previousFormattedRef = useRef<string>("");

  // Atualizar país quando initialCountry mudar APENAS se o usuário não selecionou manualmente
  useEffect(() => {
    if (!userSelectedCountry && initialCountry !== country) {
      setCountry(initialCountry);
      setValue("");
      previousDigitsRef.current = "";
      previousFormattedRef.current = "";
    }
  }, [initialCountry, userSelectedCountry, country]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const previousFormatted = previousFormattedRef.current;

      if (inputValue === "") {
        setValue("");
        previousDigitsRef.current = "";
        previousFormattedRef.current = "";
        return;
      }

      const currentDigits = inputValue.replace(/\D/g, "");
      const previousDigits = previousDigitsRef.current;

      const isDeleting =
        inputValue.length < previousFormatted.length ||
        currentDigits.length < previousDigits.length;

      if (isDeleting) {
        if (currentDigits.length === 0) {
          setValue("");
          previousDigitsRef.current = "";
          previousFormattedRef.current = "";
        } else {
          const formatted = formatPhoneNumber(currentDigits, country);
          setValue(formatted);
          previousDigitsRef.current = currentDigits;
          previousFormattedRef.current = formatted;
        }
        return;
      }

      const formatted = formatPhoneNumber(inputValue, country);
      setValue(formatted);
      previousDigitsRef.current = formatted.replace(/\D/g, "");
      previousFormattedRef.current = formatted;
    },
    [country]
  );

  const handleCountryChange = useCallback(
    (newCountry: string) => {
      setUserSelectedCountry(true);
      setCountry(newCountry as CountryCode);
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly) {
        const reformatted = formatPhoneNumber(
          digitsOnly,
          newCountry as CountryCode
        );
        setValue(reformatted);
        previousDigitsRef.current = digitsOnly;
        previousFormattedRef.current = reformatted;
      } else {
        setValue("");
        previousDigitsRef.current = "";
        previousFormattedRef.current = "";
      }
    },
    [value]
  );

  const isValid = isValidPhoneNumber(value, country);
  const digitCount = value.replace(/\D/g, "").length;
  const maxDigits = getMaxLength(country);

  const handleSearch = useCallback(() => {
    if (!value.trim() || !isValid) return;

    try {
      const digitsOnly = value.replace(/\D/g, "");
      const parsed = parsePhoneNumber(digitsOnly, country);

      if (parsed && parsed.isValid()) {
        const fullNumber = parsed.formatInternational();
        onValidSearch(fullNumber);
      } else {
        const currentCountry = countries.find((c) => c.code === country);
        const fullNumber = currentCountry
          ? `${currentCountry.dialCode} ${digitsOnly}`
          : value;
        onValidSearch(fullNumber);
      }
    } catch {
      const currentCountry = countries.find((c) => c.code === country);
      const digitsOnly = value.replace(/\D/g, "");
      const fullNumber = currentCountry
        ? `${currentCountry.dialCode} ${digitsOnly}`
        : value;
      onValidSearch(fullNumber);
    }
  }, [value, isValid, country, onValidSearch]);

  return {
    country,
    value,
    isValid,
    digitCount,
    maxDigits,
    handleChange,
    handleCountryChange,
    handleSearch,
  };
}

