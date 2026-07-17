import React from 'react';
import { ShieldCheck, RefreshCw, Truck, FileText } from 'lucide-react';

interface PolicyProps {
  policyType: 'privacy' | 'refund' | 'shipping' | 'terms';
}

export default function PolicyPages({ policyType }: PolicyProps) {
  return (
    <article className="py-24 bg-zinc-50 min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Policy Box Wrapper */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-sm space-y-6">
          
          {/* Privacy Policy */}
          {policyType === 'privacy' && (
            <div className="space-y-6" id="policy-privacy">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-zinc-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">গোপনীয়তা নীতি (Privacy Policy)</h1>
                  <span className="text-xs text-gray-400 block mt-0.5">সর্বশেষ আপডেট: জুলাই ২০২৬</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong>খান herbal হাব (KHAN HERBAL HUB)</strong>-এ আমাদের সম্মানিত কাস্টমারদের ব্যক্তিগত গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান দায়িত্ব। আমাদের ওয়েবসাইট ব্যবহারের সময় আপনার তথ্য কীভাবে সংরক্ষিত এবং ব্যবহৃত হয়, তা নিচে বিস্তারিত বর্ণনা করা হলো:
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">১. আমরা কী কী তথ্য সংগ্রহ করি?</h3>
                <p>
                  অর্ডার সম্পন্ন করতে এবং আপনার কুরিয়ার ক্লিয়ারেন্সের জন্য আমরা নিম্নোক্ত তথ্যগুলো সংগ্রহ করি:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>আপনার সম্পূর্ণ নাম</li>
                  <li>সক্রিয় মোবাইল নম্বর</li>
                  <li>সম্পূর্ণ ডেলিভারি ঠিকানা (জেলা, থানা ও এলাকা)</li>
                  <li>পেমেন্ট সংক্রান্ত তথ্য (যেমন: বিকাশ/নগদ ট্রানজেকশন আইডি)</li>
                  <li>বিশেষ কোনো ডেলিভারি নোট বা নির্দেশনা</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">২. সংগৃহীত তথ্য কীভাবে ব্যবহার করা হয়?</h3>
                <p>
                  আপনার সংগৃহীত তথ্যগুলো আমরা অত্যন্ত বিশ্বস্ততার সাথে শুধুমাত্র নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>আপনার অর্ডারটি দ্রুততম সময়ে প্রসেস এবং ডেলিভারি সম্পন্ন করার জন্য।</li>
                  <li>কুরিয়ার সার্ভিস প্রতিনিধিদের আপনার ঠিকানায় পৌঁছাতে সাহায্য করতে।</li>
                  <li>প্রয়োজনে অর্ডার সংক্রান্ত তথ্য জানাতে সরাসরি কাস্টমার সাপোর্টের মাধ্যমে যোগাযোগ করতে।</li>
                  <li>আমাদের সেবার মানোন্নয়ন ও কাস্টমার সন্তুষ্টি বৃদ্ধিতে।</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৩. তথ্যের নিরাপত্তা ও সুরক্ষামূলক ব্যবস্থা</h3>
                <p>
                  আমরা আপনার তথ্যের শতভাগ নিরাপত্তা নিশ্চিত করি। কোনো অবস্থাতেই আপনার ফোন নম্বর, নাম বা ঠিকানা কোনো তৃতীয় পক্ষের কাছে বিক্রি বা হস্তান্তর করা হয় না। এছাড়া, কুরিয়ার প্যাকেটের গায়ে কোনো স্পর্শকাতর পণ্যের বিবরণ উল্লেখ করা হয় না, যা আপনার সম্পূর্ণ গোপনীয়তা নিশ্চিত করে।
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৪. কুকিজ (Cookies) ব্যবহার</h3>
                <p>
                  আমাদের ওয়েবসাইট ব্রাউজিং অভিজ্ঞতা সহজতর করতে ও কাস্টমার প্রিফারেন্স ট্র্যাকিংয়ের জন্য সাধারণ কুকিজ প্রযুক্তি ব্যবহার করতে পারে। আপনি চাইলে ব্রাউজার সেটিংসে গিয়ে কুকিজ নিষ্ক্রিয় করতে পারেন।
                </p>

                <p className="pt-4 border-t border-zinc-100 font-semibold text-emerald-800">
                  গোপনীয়তা নীতি সংক্রান্ত কোনো প্রশ্ন থাকলে সরাসরি আমাদের হটলাইনে যোগাযোগ করুন: +8801608780378।
                </p>
              </div>
            </div>
          )}

          {/* Refund Policy */}
          {policyType === 'refund' && (
            <div className="space-y-6" id="policy-refund">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-zinc-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">রিফান্ড এবং রিটার্ন পলিসি (Refund & Return)</h1>
                  <span className="text-xs text-gray-400 block mt-0.5">সর্বশেষ আপডেট: জুলাই ২০২৬</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  আমরা <strong>খান হারবাল হাব (KHAN HERBAL HUB)</strong>-এ আমাদের পণ্যের বিশুদ্ধতা এবং কার্যকারিতার উপর শতভাগ আত্মবিশ্বাসী। তবুও কাস্টমারদের সর্বোচ্চ সন্তুষ্টি ও আস্থা বজায় রাখতে আমরা একটি সহজ ও স্বচ্ছ রিফান্ড ও রিটার্ন পলিসি দিয়ে থাকি।
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">১. ৭ দিনের ক্যাশব্যাক ও পরিবর্তন গ্যারান্টি</h3>
                <p>
                  পণ্য হাতে পাওয়ার পর থেকে আগামী ৭ দিনের মধ্যে আপনি নিম্নোক্ত কারণে রিফান্ড অথবা প্রোডাক্ট পরিবর্তন দাবি করতে পারবেন:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ডেলিভারির সময় জার বা প্যাকেজিং ভাঙা বা ক্ষতিগ্রস্ত অবস্থায় থাকলে।</li>
                  <li>আপনার অর্ডার করা পণ্যের সাথে সরবরাহকৃত পণ্য অমিল হলে।</li>
                  <li>পণ্যটির গুণগত মান বা বিশুদ্ধতা নিয়ে কোনো প্রমাণিত সমস্যা দেখা দিলে।</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">২. রিফান্ড বা রিটার্নের শর্তাবলী</h3>
                <p>
                  রিফান্ড বা রিটার্ন প্রসেসটি মসৃণভাবে সম্পন্ন করতে অনুগ্রহ করে নিচের বিষয়গুলো খেয়াল রাখুন:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>রিটার্ন দাবির সপক্ষে ডেলিভারি নেওয়া ক্ষতিগ্রস্ত পণ্যের একটি ছবি বা কুরিয়ার রিসিটের কপি আমাদের হোয়াটসঅ্যাপ নম্বরে পাঠাতে হবে।</li>
                  <li>অর্ধেকের বেশি খালি বা ইচ্ছাকৃতভাবে নষ্ট করা পণ্যের ক্ষেত্রে কোনো রিফান্ড প্রযোজ্য হবে না।</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৩. কীভাবে রিফান্ড পাবেন?</h3>
                <p>
                  আপনার রিটার্ন আবেদনটি অনুমোদিত হওয়ার পর ৩ থেকে ৭ কার্যদিবসের মধ্যে আপনার পছন্দসই পেমেন্ট মাধ্যমে (বিকাশ/নগদ/রকেট) কুরিয়ার চার্জ বাদ দিয়ে রিফান্ড সম্পন্ন করা হবে।
                </p>

                <p className="pt-4 border-t border-zinc-100 font-semibold text-emerald-800">
                  রিফান্ড বা রিটার্ন সংক্রান্ত যেকোনো প্রয়োজনে সরাসরি আমাদের হোয়াটসঅ্যাপে যোগাযোগ করুন: +8801608780378।
                </p>
              </div>
            </div>
          )}

          {/* Shipping Policy */}
          {policyType === 'shipping' && (
            <div className="space-y-6" id="policy-shipping">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-zinc-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">শিপিং এবং ডেলিভারি পলিসি (Shipping & Delivery)</h1>
                  <span className="text-xs text-gray-400 block mt-0.5">সর্বশেষ আপডেট: জুলাই ২০২৬</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong>খান হারবাল হাব (KHAN HERBAL HUB)</strong> কাস্টমারদের পণ্য দ্রুততম সময়ে এবং নিরাপদে হস্তান্তর নিশ্চিত করতে নামী ও নির্ভরযোগ্য থার্ড-পার্টি কুরিয়ার সার্ভিস ব্যবহার করে থাকে। শিপিং সংক্রান্ত আমাদের সাধারণ নীতিমালা নিচে প্রদান করা হলো:
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">১. ডেলিভারির সময়সীমা</h3>
                <p>
                  অর্ডার নিশ্চিত হওয়ার পর আমরা অত্যন্ত দ্রুততার সাথে প্রসেসিং সম্পন্ন করি:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ঢাকা ও গাজীপুর সদর এলাকা:</strong> ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিশ্চিত হোম ডেলিভারি।</li>
                  <li><strong>ঢাকার বাইরে ও অন্যান্য জেলা:</strong> সাধারণত ২ থেকে ৩ কার্যদিবসের মধ্যে দ্রুততম সময়ে হোম ডেলিভারি।</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">২. শিপিং এবং ডেলিভারি চার্জ</h3>
                <p>
                  আমাদের দেশব্যাপী ডেলিভারি চার্জ নির্ধারণ সংক্রান্ত বিবরণী:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ডেলিভারি চার্জ:</strong> সকল প্যাকেজের জন্যই সারা বাংলাদেশে কুরিয়ার ও হোম ডেলিভারি চার্জ মাত্র ১০০ টাকা ফ্ল্যাট।</li>
                </ul>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৩. ক্যাশ অন ডেলিভারি ও প্রোডাক্ট যাচাইকরণ</h3>
                <p>
                  গ্রাহকদের পূর্ণ নিরাপত্তার জন্য আমরা দেশব্যাপী কন্ডিশনাল ডেলিভারি তথা ক্যাশ অন ডেলিভারি (Cash on Delivery) প্রদান করি। আপনি প্রোডাক্ট হাতে পাওয়ার পর ডেলিভারিম্যান থেকে প্রোডাক্টটি খুলে এবং জারের সিল চেক করে সন্তুষ্ট হয়ে টাকা পরিশোধ করতে পারবেন।
                </p>

                <p className="pt-4 border-t border-zinc-100 font-semibold text-emerald-800">
                  ডেলিভারি ট্র্যাকিং বা বিলম্ব সংক্রান্ত তথ্যের জন্য যোগাযোগ করুন: +8801608780378।
                </p>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          {policyType === 'terms' && (
            <div className="space-y-6" id="policy-terms">
              <div className="flex items-center space-x-3 text-emerald-800 border-b border-zinc-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">শর্তাবলী এবং নিয়মাবলী (Terms & Conditions)</h1>
                  <span className="text-xs text-gray-400 block mt-0.5">সর্বশেষ আপডেট: জুলাই ২০২৬</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  আমাদের ওয়েবসাইট (https://khanherbalhub.tech) ব্যবহারের মাধ্যমে আপনি <strong>খান হারবাল হাব (KHAN HERBAL HUB)</strong>-এর নিম্নলিখিত নিয়ম ও শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে। অনুগ্রহ করে শর্তগুলো মনোযোগ সহকারে পড়ুন:
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">১. অর্ডার ও প্রোডাক্টের সত্যতা</h3>
                <p>
                  অর্ডার ফর্মে আপনার সঠিক নাম, সচল মোবাইল নম্বর এবং সঠিক ঠিকানা দেওয়া আপনার নৈতিক দায়িত্ব। ভুল বা কাল্পনিক তথ্যের কারণে ডেলিভারি ব্যাহত হলে তার জন্য খান হারবাল হাব দায়ী থাকবে না।
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">২. মূল্য এবং অফারসমূহ</h3>
                <p>
                  ওয়েবসাইটে প্রদর্শিত পণ্যের দাম এবং অফারসমূহ যেকোনো সময় পরিবর্তিত বা হালনাগাদ হতে পারে। তবে কাস্টমার কোনো একটি নির্দিষ্ট অর্ডারে যে দাম বা অফার দেখতে পাবেন, সেই দামেই পণ্যটি সরবরাহ করা হবে।
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৩. অপব্যবহার ও জালিয়াতি প্রতিরোধ</h3>
                <p>
                  আমাদের অর্ডার ফরমটির অপব্যবহার (যেমন: বারবার ভুয়া অর্ডার বা ডাবল সাবমিশন) রোধে স্বয়ংক্রিয় ব্লক ব্যবস্থা রয়েছে। কোনো ক্ষতিকর উদ্দেশ্যে একই নম্বরে ইচ্ছাকৃতভাবে ডুপ্লিকেট সাবমিশন প্রতিরোধ করতে আমাদের সার্ভার ১ মিনিটের কুলডাউন পিরিয়ড প্রয়োগ করে।
                </p>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">৪. পরামর্শ ও চিকিৎসাগত দাবি</h3>
                <p>
                  খান হারবাল হাবের পণ্যগুলো সম্পূর্ণ প্রাকৃতিক ও ভেষজ এনার্জি বুস্টার এবং সাধারণ স্বাস্থ্য উন্নতকারী খাদ্য উপাদান। তবে এগুলো দীর্ঘমেয়াদী বা জটিল রোগের ক্ষেত্রে ডাক্তারের প্রেসক্রিপশনের বিকল্প হিসেবে ব্যবহারযোগ্য নয়। বিশেষ শারীরিক অসুস্থতা থাকলে পণ্য ব্যবহারের পূর্বে চিকিৎসকের পরামর্শ নেওয়া আবশ্যক।
                </p>

                <p className="pt-4 border-t border-zinc-100 font-semibold text-emerald-800">
                  শর্তাবলী সংক্রান্ত যেকোনো ব্যাখ্যার জন্য আমাদের কাস্টমার রিলেশন ইমেইল বা হটলাইনে যোগাযোগ করুন।
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
