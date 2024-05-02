export const shouldAddItems = (newsOnPageCount: number, setNewsOnPageCount: React.Dispatch<React.SetStateAction<number>>): void => {
    const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const scrollTop = document.documentElement.scrollTop;
      const innerHeight = document.documentElement.clientHeight;
  
      if (
        scrollHeight - (scrollTop + innerHeight) < 300 &&
        newsOnPageCount < 100
      ) {
        setNewsOnPageCount(newsOnPageCount + 10);
      }
}