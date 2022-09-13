import { Flex, Box, Text, Grid, Link } from "@chakra-ui/react";

const Steps = ({ icon, title, description } : any) => {
    return (
        <Flex
          className="bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500"  
          cursor="pointer"
          _hover={{ bg: "#ec4899" }}
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
            <Text mt="1" color="whiteAlpha.800">
              {description}
            </Text>
          </Box>
        </Flex>
      );
}

export default Steps;