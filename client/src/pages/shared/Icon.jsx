import { Box, Flex, Tooltip } from "@chakra-ui/react";

export const Icon = ({
  icon,
  tooltipText,
  children,
  placement = "start",
  textMargin = 1,
  ...props
}) => {
  const content = (
    <Flex alignItems="center">
      {placement === "start" && icon}
      <Box
        display="inline-block"
        ml={placement === "start" ? textMargin : undefined}
        mr={placement === "end" ? textMargin : undefined}
      >
        {children}
      </Box>
      {placement === "end" && icon}
    </Flex>
  );

  if (tooltipText) {
    return (
      <Tooltip label={tooltipText}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
