import React, { useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  customStyles?: Styles;
  children?: React.ReactNode;
  width?: string,
  height?: string,
  background?:string
}

const GenericModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  customStyles,
  children,
  width = '500',
  height = '600',
  background='0.5'
}) => {

  const [screenWidth, setScreenWidth] = useState(0);

  // #region LIFECYCLE

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // #endregion


  const modalStyles: Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `rgba(0, 0, 0, ${background})`,
      zIndex: 99,
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      width: screenWidth > 576 ? `${width}px` : '100%',
      height: screenWidth > 576 ? `${height}px` : '100%',
      padding: '20px',
      border: 'none',
      borderRadius: '8px',
      background: '#1F2937',
      overflow: 'auto',
      outline: 'none',
    },
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
