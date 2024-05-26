import { useDebounce } from "@app/stores/hooks";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchfn } from "./service";
import { SearchResult } from "@app/utils/types";
import BlurLayout from "@app/views/components/BlurLayout";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Scrollbars from "react-custom-scrollbars-2";
import { decodeHTML } from "@app/utils/helper-function";

const searchRootElement = document.getElementById("spero-app-search");

const SperoSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResult, setResult] = useState<SearchResult[]>([]);
    const searchDebounce = useDebounce(keyword);

    useEffect(() => {
        if (searchDebounce) {
            searchfn(setLoading, setResult)(searchDebounce);
        } else {
            setResult([]);
        }
    }, [searchDebounce]);

    const handdleSSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value);
    };

    useEffect(() => {
        const handleClickOff = () => {
            setKeyword("");
            setResult([]);
        };
        const searchBtn = document.querySelector(
            '[data-bs-target="#search_toggle"]'
        );
        if (searchBtn) searchBtn.addEventListener("click", handleClickOff);
        return () => {
            if (searchBtn) searchBtn.removeEventListener("click", handleClickOff);
        };
    }, []);

    const formRef = useRef<HTMLFormElement>(null);

    return searchRootElement
        ? createPortal(
            <>
                <form className="search_container" ref={formRef}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            onChange={handdleSSearch}
                            value={keyword}
                            className="form-control search-form-input"
                            placeholder="Nhập tại đây"
                            aria-label="search-field"
                            aria-describedby="button-search"
                        />
                        <button
                            className="btn search-btn"
                            type="button"
                            onClick={() => {
                                setKeyword("");
                                setResult([]);
                            }}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="14"
                                    cy="14"
                                    r="13.5"
                                    fill="white"
                                    stroke="#B6B6B6"
                                />
                                <path
                                    d="M8.25176 8.25176C8.33137 8.17196 8.42593 8.10864 8.53004 8.06544C8.63416 8.02224 8.74577 8 8.85849 8C8.97121 8 9.08282 8.02224 9.18693 8.06544C9.29104 8.10864 9.38561 8.17196 9.46521 8.25176L14.0002 12.7885L18.5352 8.25176C18.6149 8.17209 18.7095 8.10888 18.8136 8.06576C18.9177 8.02264 19.0293 8.00045 19.142 8.00045C19.2546 8.00045 19.3662 8.02264 19.4703 8.06576C19.5744 8.10888 19.669 8.17209 19.7487 8.25176C19.8284 8.33144 19.8916 8.42603 19.9347 8.53013C19.9778 8.63423 20 8.74581 20 8.85849C20 8.97117 19.9778 9.08274 19.9347 9.18685C19.8916 9.29095 19.8284 9.38554 19.7487 9.46521L15.212 14.0002L19.7487 18.5352C19.8284 18.6149 19.8916 18.7095 19.9347 18.8136C19.9778 18.9177 20 19.0293 20 19.142C20 19.2546 19.9778 19.3662 19.9347 19.4703C19.8916 19.5744 19.8284 19.669 19.7487 19.7487C19.669 19.8284 19.5744 19.8916 19.4703 19.9347C19.3662 19.9778 19.2546 20 19.142 20C19.0293 20 18.9177 19.9778 18.8136 19.9347C18.7095 19.8916 18.6149 19.8284 18.5352 19.7487L14.0002 15.212L9.46521 19.7487C9.38554 19.8284 9.29095 19.8916 9.18685 19.9347C9.08274 19.9778 8.97117 20 8.85849 20C8.74581 20 8.63423 19.9778 8.53013 19.9347C8.42603 19.8916 8.33144 19.8284 8.25176 19.7487C8.17209 19.669 8.10888 19.5744 8.06576 19.4703C8.02264 19.3662 8.00045 19.2546 8.00045 19.142C8.00045 19.0293 8.02264 18.9177 8.06576 18.8136C8.10888 18.7095 8.17209 18.6149 8.25176 18.5352L12.7885 14.0002L8.25176 9.46521C8.17196 9.38561 8.10864 9.29104 8.06544 9.18693C8.02224 9.08282 8 8.97121 8 8.85849C8 8.74577 8.02224 8.63416 8.06544 8.53004C8.10864 8.42593 8.17196 8.33137 8.25176 8.25176Z"
                                    fill="#B6B6B6"
                                />
                            </svg>
                        </button>
                        <button
                            className="btn search-btn"
                            type="button"
                            id="button-search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M28.0003 28.0003L22.2096 22.2096M22.2096 22.2096C23.2001 21.2191 23.9859 20.0432 24.5219 18.749C25.058 17.4548 25.3339 16.0677 25.3339 14.6669C25.3339 13.2661 25.058 11.8791 24.5219 10.5849C23.9859 9.29071 23.2001 8.11479 22.2096 7.12428C21.2191 6.13376 20.0432 5.34804 18.749 4.81197C17.4548 4.27591 16.0677 4 14.6669 4C13.2661 4 11.8791 4.27591 10.5849 4.81197C9.29071 5.34804 8.11479 6.13376 7.12428 7.12428C5.12384 9.12472 4 11.8379 4 14.6669C4 17.496 5.12384 20.2092 7.12428 22.2096C9.12472 24.2101 11.8379 25.3339 14.6669 25.3339C17.496 25.3339 20.2092 24.2101 22.2096 22.2096Z"
                                    stroke="#717171"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
                <BlurLayout loading={loading}>
                    <Scrollbars
                        style={{
                            height: window.innerHeight - 220,
                        }}
                    >
                        <SearchResult className="result-container">
                            {searchResult.length ? (
                                <ul className="list-result">
                                    {searchResult
                                        .filter((item) => item.subtype !== "mappin-page")
                                        .map((item, index) => (
                                            <li key={index}>
                                                <Link to={item.url} reloadDocument className="d-flex">
                                                    <div className="result-img">
                                                        <img
                                                            src={item.featured_image_src || undefined}
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <h4>{decodeHTML(item.title)}</h4>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                !loading &&
                  searchDebounce && (
                                    <p>
                      Không có kết quả nào phù hợp với: <b>{keyword}</b>
                                    </p>
                                )
                            )}
                        </SearchResult>
                    </Scrollbars>
                </BlurLayout>
            </>,
            searchRootElement
        )
        : null;
};

export default SperoSearch;
const SearchResult = styled.div`
  padding: 40px;
  h4 {
    margin-left: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li + li {
    margin-top: 1.5rem;
  }
  a {
    text-decoration: none;
    color: var(--primary-1);
    padding: 16px;
    border: 1px solid transparent;
    border-radius: 12px;
    &:hover {
      border: 1px solid var(--neutral-text-4, #b6b6b6);
    }
  }
  .result-img {
    max-width: 170px;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
