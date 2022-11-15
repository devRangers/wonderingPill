import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import {
  Container,
  CloseBtn,
  ImageContainer,
  TeamInfoContainer,
  TeamContainer,
  TeamTitle,
  TeamName,
  TeamDescription,
  MemberContainer,
  MemberInfo,
  ProfileContainer,
  ProfileImageContainer,
  IconBtn,
  Info,
  Name,
} from "./TeamModal.style";

interface TeamModalProps {
  onClose: () => void;
}

const Members = {
  박수정: {
    image: "/images/team/teamImage.png",
    link: "https://github.com/ParkSuJeong74",
    role: "팀장, 서버/백엔드 개발, 기획, UI/UX 디자인",
    comment: "asd",
  },
  박정훈: {
    image: "/images/team/teamImage.png",
    link: "https://github.com/Malza0408",
    role: "프론트엔드 개발",
    comment: "asd",
  },
  백지유: {
    image: "/images/team/teamImage.png",
    link: "https://github.com/rnrn99",
    role: "프론트엔드 개발",
    comment: "asd",
  },
  김별희: {
    image: "/images/team/teamImage.png",
    link: "https://github.com/kimbyeolhee",
    role: "AI 개발",
    comment: "asd",
  },
  신광천: {
    image: "/images/team/teamImage.png",
    link: "https://github.com/Shin-GC",
    role: "백엔드 개발",
    comment: "asd",
  },
};

function TeamModal({ onClose }: TeamModalProps) {
  return (
    <Container>
      <CloseBtn onClick={onClose}>닫기</CloseBtn>
      <ImageContainer $logo>
        <Image
          src="/images/header/logo.png"
          layout="fill"
          objectFit="contain"
        />
      </ImageContainer>
      <TeamInfoContainer>
        <TeamContainer>
          <ImageContainer>
            <Image
              src="/images/team/teamImage.png"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
          <TeamTitle>
            <TeamName>DevRangers</TeamName>
            <p>2022.05 ~</p>
          </TeamTitle>
          <TeamDescription>
            DevRangers는 2022년 1월에 시작된 엘리스 AI 트랙 4기의 친목 교류에서
            시작된 소규모 개발팀입니다. <br />
            6명으로 구성되어 있으며 팀원들이 각각의 색을 가지고 있다는 의미를
            담아 Dev + (Power)Ranger의 팀명을 가지게 되었습니다.
          </TeamDescription>
        </TeamContainer>
        <MemberContainer>
          {Object.entries(Members).map(([key, value]) => (
            <MemberInfo key={key}>
              <ProfileContainer>
                <ProfileImageContainer>
                  <Image src={value.image} layout="fill" objectFit="cover" />
                </ProfileImageContainer>
                <Link href={value.link}>
                  <a target="_blank">
                    <IconBtn>
                      <AiFillGithub />
                    </IconBtn>
                  </a>
                </Link>
              </ProfileContainer>
              <Info>
                <Name>{key}</Name>
                <p>{value.role}</p>
                <p>{value.comment}</p>
              </Info>
            </MemberInfo>
          ))}
        </MemberContainer>
      </TeamInfoContainer>
    </Container>
  );
}

export default TeamModal;
