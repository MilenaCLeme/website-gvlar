import React from 'react';
import Share from '@/assets/onlyOne/share.svg';
import style from './shareButton.module.scss';

const ShareButton: React.FC<{ title: string; url: string }> = ({ title, url }) => {
  const contentToShare = {
    title,
    url,
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(contentToShare);
      } else {
        navigator.clipboard.writeText(`${contentToShare.title} ${contentToShare.url}`);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button className={style.button} onClick={handleShare}>
      <Share />
    </button>
  );
};

export default ShareButton;
