import { Flex, Link } from "@chakra-ui/react";

const Header = () => (
  <Flex
    as="header"
    justifyContent="space-between"
    minHeight="70px"
    padding="20px"
  >
    <h1>Курсы валют</h1>
    <Link href="https://github.com/MickKrishtopa/exchange-rates" target="blank">
      Репозиторий
    </Link>
  </Flex>
);

export { Header };
