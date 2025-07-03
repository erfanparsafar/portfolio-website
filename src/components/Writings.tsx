import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from 'lucide-react';

const mockWritings = [
  {
    title: "Small Decisions, Big Impact",
    title_fa: "تصمیمات کوچک، تأثیرات بزرگ",
    summary: "How tiny choices in code architecture can transform entire projects",
    summary_fa: "چگونه انتخاب‌های کوچک در معماری کد می‌تواند کل پروژه را متحول کند",
    content: `In my journey as a backend developer, I've learned that the smallest decisions often have the most profound impact. Whether it's choosing the right data structure, deciding on a naming convention, or even the way you structure your API endpoints - these seemingly minor choices compound over time.

I remember working on a project where we spent just 30 minutes debating whether to use a relational or document-based approach for a specific feature. That decision saved us weeks of refactoring later and made the entire system more maintainable.

The lesson? Never underestimate the power of thoughtful decision-making, even in the smallest details. Every line of code is a choice, and every choice matters.`,
    content_fa: `در مسیر من به عنوان یک توسعه‌دهنده بک‌اند، یاد گرفته‌ام که کوچک‌ترین تصمیمات اغلب عمیق‌ترین تأثیر را دارند. چه انتخاب ساختار داده مناسب باشد، چه تصمیم‌گیری در مورد قراردادهای نام‌گذاری، یا حتی نحوه ساختاردهی endpoint های API - این انتخاب‌های به ظاهر جزئی در طول زمان تأثیر می‌گذارند.

به یاد دارم روی پروژه‌ای کار می‌کردم که فقط 30 دقیقه صرف بحث کردیم که آیا برای یک ویژگی خاص از رویکرد رابطه‌ای یا مبتنی بر سند استفاده کنیم. آن تصمیم هفته‌ها refactoring را برای ما ذخیره کرد و کل سیستم را قابل نگهداری‌تر کرد.

درس؟ هرگز قدرت تصمیم‌گیری متفکرانه را دست کم نگیرید، حتی در کوچک‌ترین جزئیات. هر خط کد یک انتخاب است، و هر انتخاب مهم است.`
  },
  {
    title: "Humble Mentors & Real Success",
    title_fa: "اساتید فروتن و موفقیت واقعی",
    summary: "The most valuable lessons come from the most unexpected sources",
    summary_fa: "ارزشمندترین درس‌ها از غیرمنتظره‌ترین منابع می‌آیند",
    content: `Throughout my career, I've noticed something interesting: the developers who taught me the most were never the ones who bragged about their achievements. They were the quiet ones, the ones who asked questions, the ones who admitted when they didn't know something.

My first mentor at Foot o Fan was like this. He never claimed to be the best, but he showed me how to think about problems systematically. He taught me that saying "I don't know, but let's figure it out together" is more valuable than pretending to have all the answers.

Real success isn't about knowing everything - it's about being curious, humble, and willing to learn from anyone, anywhere. The moment you think you know it all is the moment you stop growing.`,
    content_fa: `در طول کار من، چیز جالبی متوجه شده‌ام: توسعه‌دهندگانی که بیشترین چیز را به من آموختند هرگز کسانی نبودند که از دستاوردهایشان لاف می‌زدند. آن‌ها افراد ساکت بودند، کسانی که سؤال می‌پرسیدند، کسانی که وقتی چیزی نمی‌دانستند اعتراف می‌کردند.

اولین راهنمای من در Foot o Fan این‌طور بود. هرگز ادعا نمی‌کرد بهترین است، اما به من نشان داد چگونه درباره مسائل به صورت سیستماتیک فکر کنم. او به من یاد داد که گفتن "نمی‌دانم، اما بیایید با هم کشف کنیم" ارزشمندتر از تظاهر به داشتن همه جواب‌هاست.

موفقیت واقعی در دانستن همه چیز نیست - در کنجکاو، فروتن و مایل به یادگیری از هر کسی، هر جایی بودن است. لحظه‌ای که فکر کنید همه چیز را می‌دانید، لحظه‌ای است که از رشد کردن باز می‌ایستید.`
  },
  {
    title: "Past Glory vs Current Opportunities", 
    title_fa: "افتخارات گذشته در مقابل فرصت‌های کنونی",
    summary: "Why living in past achievements can blind us to present possibilities",
    summary_fa: "چرا زندگی در دستاوردهای گذشته می‌تواند ما را از امکانات حال کور کند",
    content: `I've met developers who constantly talk about projects they built years ago, languages they mastered in college, or frameworks they were experts in before they became obsolete. While experience is valuable, I've learned that clinging to past achievements can become a trap.

The tech world moves fast. Django best practices from 2020 aren't the same as 2024. The PostgreSQL optimization techniques I learned last year might not be the most efficient ones today. Instead of resting on past laurels, I try to stay curious about what's happening now.

This doesn't mean discarding everything you know - it means building on your foundation while staying open to new approaches. The developers who thrive are those who see their past as a stepping stone, not a throne to sit on.`,
    content_fa: `با توسعه‌دهندگانی آشنا شده‌ام که مدام درباره پروژه‌هایی که سال‌ها پیش ساخته‌اند، زبان‌هایی که در دانشگاه تسلط داشته‌اند، یا framework هایی که قبل از منسوخ شدن متخصص بودند، صحبت می‌کنند. در حالی که تجربه ارزشمند است، یاد گرفته‌ام که چسبیدن به دستاوردهای گذشته می‌تواند تله‌ای باشد.

دنیای تکنولوژی سریع حرکت می‌کند. بهترین روش‌های Django از سال 2020 مثل 2024 نیست. تکنیک‌های بهینه‌سازی PostgreSQL که سال گذشته یاد گرفتم ممکن است کارآمدترین روش‌های امروز نباشد. به جای تکیه بر افتخارات گذشته، سعی می‌کنم نسبت به آنچه اکنون اتفاق می‌افتد کنجکاو باشم.

این به معنای دور انداختن همه چیزهایی که می‌دانید نیست - به معنای ساختن بر روی پایه‌تان در حالی که به رویکردهای جدید باز هستید. توسعه‌دهندگانی که پیشرفت می‌کنند کسانی هستند که گذشته‌شان را پله‌ای می‌بینند، نه تختی برای نشستن.`
  }
];

const Writings = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [writings, setWritings] = useState(mockWritings);

  useEffect(() => {
    axios.get("http://localhost:8000/api/writings/")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setWritings(res.data);
      })
      .catch(() => {});
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-gradient mb-4">
            Writings & Insights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-matrix-green to-electric-blue mx-auto rounded-full"></div>
          <p className="text-muted-foreground font-mono mt-4">Thoughts from the trenches of development</p>
        </div>

        <div className="space-y-6">
          {writings.map((writing, index) => (
            <div
              key={index}
              className="bg-card border border-matrix-green/20 rounded-lg terminal-shadow hover:glow transition-all duration-300"
            >
              {/* Card Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleCard(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-mono font-bold text-matrix-green mb-2">
                      {writing.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {writing.summary}
                    </p>
                  </div>
                  <div className="ml-4 text-electric-blue">
                    {expandedCard === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCard === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 border-t border-matrix-green/10">
                  <div className="bg-terminal-bg rounded-lg p-4 mt-4">
                    <div className="flex items-center mb-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="ml-4 text-sm text-muted-foreground font-mono">thought.md</span>
                    </div>
                    <div className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {writing.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writings;
