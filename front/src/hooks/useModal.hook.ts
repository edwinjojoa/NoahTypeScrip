import { useState } from "react";

interface UseModalReturn<T> {
  isOpen: boolean;
  data: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export const useModal = <T,>(): UseModalReturn<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (newData?: T) => {
    setData(newData ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
  };

  const toggleModal = () => setIsOpen((prev) => !prev);

  return { isOpen, data, openModal, closeModal, toggleModal };
};