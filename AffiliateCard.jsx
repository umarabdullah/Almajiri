import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function AffiliateCard({name,madrasatName,address}) {
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    setVisible(false);
    onClick={onDelete};
  };

  if (!visible) return null;

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      

      <Card sx={{ maxWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              
            </Avatar>
          }
          
          title={`${name}`}
          subheader={`${madrasatName}`}
         
        />
        
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${address}`}
          </Typography>
        </CardContent>
        
        
      </Card>
    </div>
  );
}
