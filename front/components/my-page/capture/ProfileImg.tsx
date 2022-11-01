import Image from "next/image";

interface ProfileImgProps {
  profileImg: string;
}

function ProfileImg({ profileImg }: ProfileImgProps) {
  return (
    <Image
      src={profileImg}
      alt="user-profile-img"
      layout="fill"
      objectFit="cover"
      style={{
        borderRadius: "50%",
      }}
      priority
    />
  );
}

export default ProfileImg;
