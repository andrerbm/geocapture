import { useTranslation } from "react-i18next";

export default function SocialProof() {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-1">
        {/* 4 estrelas cheias */}
        {[...Array(4)].map((_, i) => (
          <StarIcon key={i} />
        ))}
        {/* Meia estrela (4.8/5) */}
        <HalfStarIcon />
      </div>
      <p className="text-sm text-gray-600">{t("unlock.numbersLocated")}</p>
      <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>{t("unlock.averageRating")}</span>
        <span className="font-semibold text-yellow-500">4.8/5</span>
        <span className="text-yellow-400">⭐</span>
      </p>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function HalfStarIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <defs>
        <clipPath id="half-star">
          <rect x="0" y="0" width="10" height="20" />
        </clipPath>
      </defs>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        clipPath="url(#half-star)"
      />
    </svg>
  );
}

