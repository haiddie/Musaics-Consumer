export const NumberFormatter = (number: any) => {
    const formatNumber = (num: number) => {
      const absNum = Math.abs(num);
      if (absNum >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
      } else if (absNum >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
      } else if (absNum >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K';
      } else {
        return num;
      }
    };

    return <span>{formatNumber(number)}</span>;
  };