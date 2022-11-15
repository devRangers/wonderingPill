import { useState, useCallback } from "react";
import Modal from "@modal/Modal";
import { SearchProp } from "pages/search";
import CaptureGuideModal from "./CaptureGuideModal";
import SearchWithImage from "./SearchWithImage";

const Search = ({ foundCookie }: SearchProp) => {
  const [modalOpen, setModalOpen] = useState(true);
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <SearchWithImage />
      {!foundCookie && modalOpen ? (
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <CaptureGuideModal handleCloseModal={handleCloseModal} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
