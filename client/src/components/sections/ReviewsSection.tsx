import { useTranslation } from "react-i18next";
import { Users, Star, CheckCircle2 } from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
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
          <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <SiAppstore className="w-7 h-7 flex-shrink-0" style={{ color: '#007AFF' }} />
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
          <div className="flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <SiGoogleplay className="w-7 h-7 flex-shrink-0" />
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

