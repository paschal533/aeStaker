/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Flex, Text, Box, Grid, Divider, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { TwitterShareButton } from "react-twitter-embed";
//import Logo from '../assets/logo.png';

const TextLink = ({ text, href }: any) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Text color="white">{text}</Text>
    </Link>
  );
};

export default function Footer() {
  return (
    <Box
      zIndex={999}
      bottom="0"
      left="0"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      transitionDuration="300ms"
      bg="#560d58"
      justifyContent="center"
    >
      <Divider filter="brightness(30%)" />
      <Flex
        justify="space-between"
        w="full"
        alignItems="center"
        px={{ md: "10", lg: "10" }}
        direction={{ base: "column", md: "row" }}
        py="16"
        maxW="5xl"
      >
        <NextLink href="/" passHref>
          <Flex alignItems="center" experimental_spaceX="6" cursor="pointer">
            <Image
              height={80}
              width={80}
              src="https://rb.gy/vsvv2o"
              alt="dfunds"
            />
            <Flex
              fontSize={{ base: "4xl", lg: "6xl" }}
              color="white"
              alignItems="center"
            >
              <Text fontFamily="heading" fontWeight="extrabold">
                Stake{" "}
              </Text>
              <Text ml="0.5" fontFamily="body" fontWeight="medium" mb="1">
                R
              </Text>
            </Flex>
          </Flex>
        </NextLink>
        <Grid
          mt={{ base: "10", md: "0" }}
          templateColumns={{
            base: "repeat(3,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ md: "10", lg: "20" }}
          textAlign="center"
          fontSize="base"
          color="white"
        >
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="Contract" href="/" />
            <TwitterShareButton
              url={"https://dfund.netlify.app/"}
              options={{
                text: "DFunds | A Decenterized fund raiser app",
              }}
            />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="Support" href="mailto:okwuosahpaschal@gmail.com" />
            <TextLink text="Product" href="/" />
          </Grid>
          <Grid templateColumns="repeat(1,1fr)" gap="4">
            <TextLink text="How to use" href="/" />

            <TextLink href="/about" text="Team" />
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
}
