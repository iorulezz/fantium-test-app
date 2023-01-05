import { Grid, GridItem } from "@chakra-ui/react";
import { Footer, Header } from "../components";
import { Mint } from "../views/Mint";

export default function IndexPage() {
  return (
    <>
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          <Header />
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          <Mint />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
}
