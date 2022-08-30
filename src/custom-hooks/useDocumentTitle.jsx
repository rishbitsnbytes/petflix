const useDocumentTitle = () => {
  const setDocumentTitle = (title) => {
    return (document.title = title);
  };
  return setDocumentTitle;
};

export { useDocumentTitle };
