import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Lato', sans-serif;
    transition: all 0.50s linear;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
      background-color: ${({ theme }) => theme.imgContainerColor};
      padding: 0.35rem 0.4rem 0.1rem 0.5rem;
      font-size: 90%;
      font-weight: 600;
      color: #e959ad !important;
      border-radius: 4px;
  }
  a {
      color: ${({ theme }) => theme.link};
  }
  h1, h2, h3, h4, h5, h1 a, h5 a {
      color: ${({ theme }) => theme.headings};
  }
  ul li {
    text-decoration: none;
    list-style: none;
  }
  .display-1 {
    font-size: 8rem;
  }
  h1 a {
    text-decoration: none !important;
  }
  .border {
    border: ${({ theme }) => theme.borderColor};
  }
  .border-dashed {
    border: ${({ theme }) => theme.borderColorDashed};
  }
  .btn {
      color: ${({ theme }) => theme.buttonColor};
      border-color: ${({ theme }) => theme.buttonColor};
      background-color: ${({ theme }) => theme.buttonBackground};
      border: ${({ theme }) => theme.borderColor};
  }
  .btn:hover {
    color: ${({ theme }) => theme.buttonHvrColor};
    background-color: ${({ theme }) => theme.btnHvrBackground}
  }
  hr {
      border-top: ${({ theme }) => theme.hr}
  }
  .card-hr {
    border-top: ${({ theme }) => theme.cardHr}
  }
  .darkToggle {
      border-bottom: 0 !important;
      border-radius: 8px 8px 0 0 !important;
  }
  .darkToggleReversed {
    border-top: 0 !important;
    border-radius: 0 0 8px 8px !important;
    a:hover {
      text-decoration: none;
      color: ${({ theme }) => theme.buttonHvrColor};
    }
  }
  .imgContainer  {
    background-color: ${({ theme }) => theme.imgContainerColor}
  }
  .markdown-body ul li {
    list-style: circle !important;
  }
  .markdown-body ul {
    padding: 0 1rem;
  }
  .toggler {
    color: ${({ theme }) => theme.buttonColor};
  }
  .link-wrapper:hover {
    background-color: ${({ theme }) => theme.imgContainerColor};
    border-radius: 4px;
    a {
      text-decoration: none !important;
    }
  }
  .article-container {
    line-height: 2;
    font-size: 1.09rem;
    font-weight: 400;
    li {
      list-style: circle;
    }
    h2 {
      padding: 2rem 0 0.5rem 0;
    }
 
  }
  `
