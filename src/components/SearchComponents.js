import React, { useState } from 'react';
import axios from 'axios';
import { searchStyles } from '../styles/searchStyles';

const SearchBox = ({ setFilteredReviews, setSearchTerm, clickedTags, setClickedTags }) => {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  const tags = ['식사', '카페', '공부', '문화생활', '쇼핑', '자연', '산책', '친목', '여럿이', '혼자'];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setClickedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        const newTags = prevTags.filter((t) => t !== tag);
        fetchByTags(newTags);
        return newTags;
      } else if (prevTags.length < 2) {
        const newTags = [...prevTags, tag];
        fetchByTags(newTags);
        return newTags;
      } else {
        window.confirm('태그는 2개까지 선택할 수 있습니다.');
        return prevTags;
      }
    });
  };

  //검색어로 검색
  const fetchBySearchTerm = async (text) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/query`, {
        params: { query: text },
        headers,
      });

      if (response.status === 200) {
        const data = response.data.map((item) => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags,
          likes: item.likes,
        }));
        setFilteredReviews(data);
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('검색어를 입력해주세요.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  //태그로 검색
  const fetchByTags = async (tagNames) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      console.log('Fetching by tags:', tagNames);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/purpose`, {
        params: { purpose: tagNames },
        headers,
        paramsSerializer: params => {
          return Object.keys(params).map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
          }).join('&');
        }
      });

      if (response.status === 200) {
        const data = response.data.map((item) => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags,
          likes: item.likes,
        }));
        setFilteredReviews(data);
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('최소 하나 이상의 해시태그를 선택해야 합니다.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchText);
    fetchBySearchTerm(searchText);
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #1B4345;
            font-family: 'Freesentation', sans-serif;
            font-size: 18px;
          }
          input:focus::placeholder {
            opacity: 0;
          }
        `}
      </style>
      <div style={searchStyles.searchContainer}>
        <div style={searchStyles.inputContainer}>
          <input
            type='text'
            style={searchStyles.input}
            placeholder='검색어를 입력하세요'
            value={searchText}
            onChange={handleInputChange}
          />
          <button style={searchStyles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
        <div style={searchStyles.searchTagContainer}>
          <div style={searchStyles.searchTagList}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  ...searchStyles.searchTag,
                  backgroundColor: clickedTags.includes(tag) ? '#1B4345' : 'transparent',
                  color: clickedTags.includes(tag) ? '#fff' : '#1B4345',
                  borderColor: '#1B4345',
                  cursor: 'pointer',
                }}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default SearchBox;
