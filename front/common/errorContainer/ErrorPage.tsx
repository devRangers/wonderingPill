import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  FULL_HEIGHT,
  MAIN_COLOR,
  ACCENT_COLOR,
} from "@utils/constant";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import {
  Container,
  Card,
  Icon,
  Title,
  Description,
  Message,
} from "./ErrorPage.style";

interface ErrorPageProps {
  title: string;
  description: string;
  link: string;
  pageName: string;
}

const COUNT_TIME = 3;

function ErrorPage({ title, description, link, pageName }: ErrorPageProps) {
  const router = useRouter();
  const [count, setCount] = useState(COUNT_TIME);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push({ pathname: link });
    }, COUNT_TIME * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (count > 0) {
        setCount((cur) => cur - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(countdown);
    };
  }, [count]);

  return (
    <Container
      $fullHeight={FULL_HEIGHT}
      $headerHeight={HEADER_HEIGHT}
      $footerHeight={FOOTER_HEIGHT}
      $bgColor={MAIN_COLOR}>
      <Card>
        <Icon $iconColor={ACCENT_COLOR}>
          <BsFillExclamationCircleFill />
        </Icon>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Message>
          {count}초 뒤 {pageName}(으)로 이동합니다.
        </Message>
      </Card>
    </Container>
  );
}

export default ErrorPage;
