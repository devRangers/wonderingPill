import { useState, useCallback } from "react";
import Modal from "@modal/Modal";
import InfoPageContent from "./InfoPageContent";
import InstallModal from "./installModal/InstallModal";
import InfoModal from "./infoModal/InfoModal";
import TeamModal from "./teamModal/TeamModal";

function InfoPageComp() {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const modalCloseHandler = useCallback(() => {
    setIsInstallModalOpen(false);
    setIsInfoModalOpen(false);
    setIsTeamModalOpen(false);
  }, []);

  const installModalOpenHandler = useCallback(() => {
    setIsInstallModalOpen(true);
  }, []);
  const infoModalOpenHandler = useCallback(() => {
    setIsInfoModalOpen(true);
  }, []);
  const teamModalOpenHandler = useCallback(() => {
    setIsTeamModalOpen(true);
  }, []);

  return (
    <>
      <InfoPageContent
        installModalOpenHandler={installModalOpenHandler}
        infoModalOpenHandler={infoModalOpenHandler}
        teamModalOpenHandler={teamModalOpenHandler}
      />
      {(isInstallModalOpen || isInfoModalOpen || isTeamModalOpen) && (
        <Modal
          open={isInstallModalOpen || isInfoModalOpen || isTeamModalOpen}
          isInfoPage
          onClose={modalCloseHandler}>
          {(isInstallModalOpen && (
            <InstallModal onClose={() => setIsInstallModalOpen(false)} />
          )) ||
            (isInfoModalOpen && (
              <InfoModal onClose={() => setIsInfoModalOpen(false)} />
            )) ||
            (isTeamModalOpen && (
              <TeamModal onClose={() => setIsTeamModalOpen(false)} />
            ))}
        </Modal>
      )}
    </>
  );
}

export default InfoPageComp;
