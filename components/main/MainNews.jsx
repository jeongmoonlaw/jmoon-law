import React from "react";
import MainNewsLegacy from "./MainNewsLegacy";
import { NAVER_BLOG_ID } from "../../lib/naverBlog";

// 기존 하드코딩 뉴스 3건을 다시 보이게 하려면 true로 변경
const SHOW_LEGACY_NEWS = false;

const FALLBACK_THUMBNAIL = "/images/news_01.jpeg";

export default function MainNews({ posts }) {
  const hasPosts = Array.isArray(posts) && posts.length > 0;

  if (!hasPosts) {
    return SHOW_LEGACY_NEWS ? <MainNewsLegacy /> : null;
  }

  return (
    <>
      <section className="py-20">
        <div className="container">
          <h1 className="text-2xl lg:text-5xl font-bold mb-5 wow animate__animated animate__fadeIn animated">
            BLOG
          </h1>
          <div className="flex flex-wrap -mx-3">
            {posts.map((post, i) => (
              <div
                key={post.link}
                className="w-full lg:w-1/3 px-3 mb-12 wow animate__animated animate__fadeIn animated hover-up-5"
                data-wow-delay={i % 2 === 0 ? ".1s" : ".3s"}
              >
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <img
                    className="h-80 w-full object-cover rounded"
                    src={post.thumbnail || FALLBACK_THUMBNAIL}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </a>
                <p className="mt-6 text-sm text-blue-400">
                  <span className="inline-block py-1 px-3 text-xs font-semibold rounded-mainColor rounded-xl mr-3">
                    {post.category || "Blog"}
                  </span>
                  <span className="text-blueGray-400 text-xs">{post.date}</span>
                </p>
                <h3 className="my-2 text-2xl font-bold font-heading">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h3>
                <p className="text-blueGray-400 leading-loose news-text">{post.summary}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href={`https://blog.naver.com/${NAVER_BLOG_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4 px-8 text-xs text-white font-semibold leading-none default-btn rounded"
            >
              블로그에서 더 보기
            </a>
          </div>
        </div>
      </section>
      {SHOW_LEGACY_NEWS && <MainNewsLegacy />}
    </>
  );
}
