import { useState, useCallback } from "react";
import { Container } from "./Search.style";
import CaptureGuideModal from "./CaptureGuideModal";
import SearchWithImage from "./SearchWithImage";
import Description from "./Description";
import Modal from "@modal/Modal";
import { FOOTER_HEIGHT, FULL_HEIGHT, HEADER_HEIGHT } from "@utils/constant";
import { SearchProp } from "pages/search";

const Search = ({ foundCookie }: SearchProp) => {
  const [modalOpen, setModalOpen] = useState(true);
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <Container
        $headerHeight={HEADER_HEIGHT}
        $footerHeight={FOOTER_HEIGHT}
        $fullHeight={FULL_HEIGHT}>
        <SearchWithImage />
        <Description />
      </Container>
      {!foundCookie && modalOpen && (
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <CaptureGuideModal handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default Search;
