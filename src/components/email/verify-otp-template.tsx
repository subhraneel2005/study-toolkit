/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ConfirmEmailProps {
  validationCode?: string;
}

export const ConfirmEmail = ({ validationCode }: ConfirmEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Confirm your email address</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="https://raw.githubusercontent.com/subhraneel2005/genai-project-01/main/public/logo.png"
            width="120"
            height="36"
            alt="r-agent-logo"
          />
        </Section>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window
          and we&apos;ll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn&apos;t request this email, there&apos;s nothing to worry
          about, you can safely ignore it.
        </Text>

        <Section>
          <Text style={footerText}>
            ©2025 Subhraneel Corp. <br />
            West Bengal, India <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ConfirmEmail.PreviewProps = {
  validationCode: "687-TLX",
} as ConfirmEmailProps;

export default ConfirmEmail;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "8px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
