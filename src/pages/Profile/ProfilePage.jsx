import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { User, Mail } from "lucide-react";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";
import PageHeader from "../../components/texts/PageHeader";
import { useAuth } from "../../stores/useAuth";

const ProfilePage = () => {
  const { name, email } = useAuth();

  return (
    <CommonPageLayout>
      <PageHeader
        title="Profile Details"
        subtitle="Check all the details of your profile here."
      />

      <Box sx={{ maxWidth: 600, mx: "auto", mt: 3 }}>
        <Card>
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 3,
                bgcolor: "primary.main",
              }}
            >
              <User size={32} />
            </Avatar>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                {name || "No name available"}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Mail size={18} />
                {email || "No email available"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </CommonPageLayout>
  );
};

export default ProfilePage;
