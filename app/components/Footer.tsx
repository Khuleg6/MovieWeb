import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="py-[60px] w-full flex  justify-evenly items-start gap-[540px] text-white mt-10 bg-[#4338CA]">
      <div className="flex flex-col gap-3">
        <Logo isDark={true} />
        <p>© 2026 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex gap-20">
        <div className="flex flex-col gap-1.5">
          <p>Contact Information</p>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-4 ">
              <svg
                className="h-12 flex items-center"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 4.6665L8.68671 8.4665C8.48089 8.59545 8.24292 8.66384 8.00004 8.66384C7.75716 8.66384 7.51919 8.59545 7.31337 8.4665L1.33337 4.6665M2.66671 2.6665H13.3334C14.0698 2.6665 14.6667 3.26346 14.6667 3.99984V11.9998C14.6667 12.7362 14.0698 13.3332 13.3334 13.3332H2.66671C1.93033 13.3332 1.33337 12.7362 1.33337 11.9998V3.99984C1.33337 3.26346 1.93033 2.6665 2.66671 2.6665Z"
                  stroke="#FAFAFA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <svg
                className="h-12 flex items-center"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7587 10.4467V12.4467C13.7595 12.6324 13.7215 12.8162 13.6471 12.9863C13.5727 13.1564 13.4636 13.3091 13.3268 13.4346C13.19 13.5602 13.0285 13.6557 12.8526 13.7152C12.6767 13.7747 12.4903 13.7968 12.3054 13.7801C10.254 13.5572 8.28341 12.8562 6.55208 11.7334C4.9413 10.7098 3.57564 9.34418 2.55208 7.7334C1.4254 5.9942 0.72424 4.01406 0.505411 1.9534C0.488751 1.76904 0.510661 1.58324 0.569745 1.40781C0.628828 1.23239 0.723792 1.07119 0.848588 0.934479C0.973385 0.797767 1.12528 0.688538 1.29461 0.613746C1.46393 0.538954 1.64697 0.500239 1.83208 0.500065H3.83208C4.15562 0.49688 4.46927 0.61145 4.71459 0.82242C4.9599 1.03339 5.12013 1.32636 5.16541 1.64673C5.24983 2.28678 5.40638 2.91522 5.63208 3.52006C5.72177 3.75868 5.74119 4.01801 5.68802 4.26732C5.63485 4.51663 5.51132 4.74547 5.33208 4.92673L4.48541 5.7734C5.43445 7.44243 6.81638 8.82436 8.48541 9.7734L9.33208 8.92673C9.51334 8.74749 9.74218 8.62396 9.99149 8.57079C10.2408 8.51762 10.5001 8.53704 10.7387 8.62673C11.3436 8.85243 11.972 9.00898 12.6121 9.0934C12.9359 9.13909 13.2317 9.3022 13.4431 9.55173C13.6545 9.80125 13.7669 10.1198 13.7587 10.4467Z"
                  stroke="#FAFAFA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Follow us</p>
          <div className="flex gap-3">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
