import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, TextField, MenuItem, Button, Stack } from "@mui/material";
import { User, Mail, Phone } from "lucide-react";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";
import PageHeader from "../../components/texts/PageHeader";
import { useAuth } from "../../stores/useAuth";
import useApiCall from "../../hooks/useApiCall";
import apiList from "../../constants/apiList";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { name, email, id } = useAuth();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const { data, loading } = useApiCall({ ...apiList.PROFILE.GET });
  const { apiCall: saveProfile } = useApiCall({ ...apiList.PROFILE.SAVE, autoFetch: false });

  useEffect(() => {
    if (data?.data) {
      setAge(data.data.age || "");
      setGender(data.data.gender || "");
      setPhone(data.data.phone || "");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const response = await saveProfile({ body: { accountId: id, age: Number(age), gender, phone } });
      toast.success(response.message || "Profile saved successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    <CommonPageLayout>
      <PageHeader
        title="Profile Details"
        subtitle="Check all the details of your profile here."
      />

      <Box sx={{ maxWidth: 600, mx: "auto", mt: 3 }}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                }}
              >
                {name?.charAt(0)?.toUpperCase() || <User size={40} />}
              </Avatar>
              <Typography variant="h5" fontWeight="600">
                {name || "No name available"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1 }}>
                <Mail size={16} />
                {email || "No email available"}
              </Typography>
            </Box>

            <Stack spacing={2}>
              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fullWidth
                size="small"
              />

              <TextField
                label="Gender"
                select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>

              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                size="small"
              />

              <Button 
                variant="contained" 
                onClick={handleSave} 
                disabled={loading}
                sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
              >
                Save Profile
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </CommonPageLayout>
  );
};

export default ProfilePage;
