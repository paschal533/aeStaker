import { Flex, Box, Text, Grid, Link } from "@chakra-ui/react";
import { ImFire } from "react-icons/im";

const StakerPlans = ({ icon, title, description }: any) => {
  return (
    <Flex
      bg="whiteAlpha.200"
      cursor="pointer"
      _hover={{ bg: "whiteAlpha.300" }}
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
        {icon}
      </Box>
      <Box ml="2">
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

const StakerOptions = () => {
  return (
    <div className="text-white mt-4">
      <h1 className="text-bold text-2xl">Choose a plan</h1>
      <div className="pr-2 pt-4 pb-2">
        <StakerPlans icon={<ImFire />} title="Basic" description="Basic plan" />
      </div>
      <div className="pr-2 pt-2 pb-2">
        <StakerPlans icon={<ImFire />} title="Basic" description="Basic plan" />
      </div>
      <div className="pr-2 pt-2 pb-2">
        <StakerPlans icon={<ImFire />} title="Basic" description="Basic plan" />
      </div>
      <div className="pr-2 pt-2 pb-2">
        <StakerPlans icon={<ImFire />} title="Basic" description="Basic plan" />
      </div>
    </div>
  );
};

export default StakerOptions;
