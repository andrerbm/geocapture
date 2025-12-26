import { useTranslation } from "react-i18next";
import { Users, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LocateButton from "@/components/LocateButton";

export default function ReviewsSection() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: t("reviews.review1Name"),
      role: t("reviews.review1Role"),
      desc: t("reviews.review1Desc"),
      img: "https://i.pravatar.cc/150?u=5",
    },
    {
      name: t("reviews.review2Name"),
      role: t("reviews.review2Role"),
      desc: t("reviews.review2Desc"),
      img: "https://i.pravatar.cc/150?u=8",
    },
    {
      name: t("reviews.review3Name"),
      role: t("reviews.review3Role"),
      desc: t("reviews.review3Desc"),
      img: "https://i.pravatar.cc/150?u=3",
    },
  ];

  return (
    <section className="py-10 bg-slate-50/80">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-primary font-bold text-lg">
              <Users className="h-5 w-5" /> {t("reviews.title")}
            </div>
          </div>
          <p className="text-gray-400 font-medium">{t("reviews.subtitle")}</p>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-gray-900">
                {t("reviews.rating")}
              </span>
              <span className="text-gray-500 text-sm">
                ({t("reviews.totalReviews")})
              </span>
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
              <p className="text-emerald-700 font-bold text-sm">
                {t("reviews.locationsToday")}
              </p>
            </div>
          </div>
        </div>

        {/* App Store badges */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-12">
          {/* App Store */}
          <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <svg
              className="w-6 h-6 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 leading-none">
                {t("reviews.availableOn")}
              </span>
              <span className="font-bold text-gray-900 text-sm leading-tight">
                {t("reviews.appStore")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-gray-200">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-gray-900 font-bold text-sm">4.6</span>
            </div>
          </div>

          {/* Google Play */}
          <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.497-1.478V3.292c0-.553.19-1.063.496-1.478z"
              />
              <path
                fill="#FBBC04"
                d="M16.296 15.5L3.609 22.186a2.321 2.321 0 0 0 1.627.66c.407 0 .815-.1 1.18-.304l13.091-7.365-3.21-3.177z"
              />
              <path
                fill="#4285F4"
                d="M21.623 12c0-.78-.378-1.511-1.009-1.959l-4.318-2.541-3.5 3.5 3.5 3.5 4.318-2.541A2.363 2.363 0 0 0 21.623 12z"
              />
              <path
                fill="#34A853"
                d="M3.609 1.814A2.321 2.321 0 0 1 5.236.5c.407 0 .815.1 1.18.304l9.88 5.696-3.21 3.177L3.609 1.814z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 leading-none">
                {t("reviews.availableOn")}
              </span>
              <span className="font-bold text-gray-900 text-sm leading-tight">
                {t("reviews.googlePlay")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-gray-200">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-gray-900 font-bold text-sm">4.5</span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl"
            >
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10 border border-gray-100">
                    <AvatarImage src={review.img} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">
                      {review.name}
                    </h4>
                    <div className="flex items-center text-emerald-500 text-xs font-medium mt-0.5">
                      <CheckCircle2 className="h-3 w-3 mr-1 fill-emerald-500 text-white" />{" "}
                      {t("reviews.verified")}
                    </div>
                  </div>
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-2">
                  {review.role}
                </h5>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {review.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 max-w-md mx-auto">
          <LocateButton size="md" />
        </div>
      </div>
    </section>
  );
}

