import  { useState } from 'react'
import './App.css'
import axios from 'axios';
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';


function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handeleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
      const response = await axios.post('http://127.0.0.1:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email. Please try again'); 
      console.error(error);
    } finally {
      setLoading(false);
   }

  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" coponent="h1" gutterBottom>
          Email Reply Generator 
        </Typography>

        <Box sx={{ mx: 3 }}>
          <TextField
            label="Original Email Content"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handeleSubmit}
            disabled={!emailContent || loading}
            fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
            </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>)}

        {generatedReply && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Generated Reply
            </Typography>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              value={generatedReply || ''}
              readOnly/>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                navigator.clipboard.writeText(generatedReply);
              }}>
              Copy to Clipboard
            </Button>
          </Box>)}
      </Container>
    </>
  )
}

export default App
