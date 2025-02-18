import {
  Flex,
  Box,
  Heading,
  Image,
  ButtonGroup,
  Button,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Box bg="rpblue" color="white" py={[3, 3]}>
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Link href="/" display="flex" alignItems="center" mb="3">
          <Image src="/images/logo-transparent.svg" boxSize="50px" />
          <Heading as="h1" mx="2">
            TensorPool
          </Heading>
        </Link>
        <ButtonGroup
          gap={3}
          colorScheme="whiteAlpha"
          flexWrap="wrap"
          justifyContent="center"
          display="flex"
          width="100%"
          maxW="800px"
        >
          <Link href="/">
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              About
            </Button>
          </Link>

          <Link href="/pricing">
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              Pricing
            </Button>
          </Link>

          <Link href="https://github.com/tensorpool/tensorpool" isExternal>
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              Docs
            </Button>
          </Link>

          <Link href="/faqs">
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              FAQs
            </Button>
          </Link>

          <Link href="/blog">
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              Blog
            </Button>
          </Link>

          <Link href={user ? "/dashboard" : "/join"}>
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="1.5px"
              borderRadius="25"
            >
              {user ? "Dashboard" : "Sign In"}
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Header;
