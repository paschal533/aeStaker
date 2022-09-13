 /* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Grid, Link } from "@chakra-ui/react";
import Image from "next/image";
import Chocie from "../../assets/chocie.png"
import Lend from "../../assets/lend.png"
import Stake from "../../assets/stake.png"


export default function Steps() {
  const Step = ({ step, title, description } : any) => {
    return (
      <Flex
        direction="column"
        bg="whiteAlpha.100"
        cursor="pointer"
        _hover={{ bg: "whiteAlpha.200" }}
        transitionDuration="200ms"
        p="10"
        rounded="xl"
      >
        <Box
          bg="brand.blue"
          border="4px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          rounded="full"
          w="12"
          h="12"
          fontSize="xl"
          fontWeight="bold"
          color="white"
          p="2"
          borderColor="whiteAlpha.500"
        >
          <Image src={step} width={40} height={40} alt="step" />
        </Box>
        <Box mt="2">
          <Text fontWeight="bold" fontSize="2xl" color="white">
            {title}
          </Text>
          <Text mt="1" color="whiteAlpha.600">
            {description}
          </Text>
        </Box>
      </Flex>
    );
  };

  return (
    <Box
      id="steps"
      position="relative"
      zIndex={2}
      w="full"
      opacity="0.97"
      mx="auto"
       
    >
       <Grid
        mt="2"
        px="10"
        maxW="6xl"
        mx="auto"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="10"
        w="full"
      >
        <Step
          title="Stake"
          step={Stake}
          description={
            <>
              {" "}
               Stake your AE token and earn massive rewards
            </>
          }
        />
        <Step
          title="Borrow"
          step={Lend}
          description={
            <>
              We let you borrow any amount of money with little interest
            </>
          }
        />
        <Step
          title="Choice"
          step={Chocie}
          description={
            <>
              You retain your right to choose your plan for staking as well as borrowing
            </>
          }
        />
      </Grid>
    </Box>
  );
}