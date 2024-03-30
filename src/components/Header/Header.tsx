import { Flex, Box, Link } from "@chakra-ui/react";

const Header = () => (
  <Flex
    as="header"
    justifyContent="space-between"
    minHeight="70px"
    padding="20px"
    borderBottom="2px solid black"
    marginBottom="20px"
    fontSize="20px"
    fontWeight="700"
  >
    <Box as="h1">Курсы валют</Box>
    <Link href="https://github.com/MickKrishtopa/exchange-rates" target="blank">
      Репозиторий
    </Link>
  </Flex>
);

export { Header };
