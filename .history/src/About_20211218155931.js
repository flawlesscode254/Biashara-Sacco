import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const About = () => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzahner.imgix.net%2Fe0bbea84-46e1-4e79-ac76-89bb79cf55c0%2Fmit-stata-center-photo-by-tex-jernigan-copyright-zahner-1039.jpg%3Fw%3D1920&f=1&nofb=1"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Nelcom College
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We are an institution that is here to help you achieve your goals.
            We beleive that through project based learning, our students will
            be able to get the most of the education that we offer.
            Nelcom College is open to views from our community, we will always
            be available to ensure your learning process remains smooth and uninterupted.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default About