import React from 'react';
import StyleIcon from '@mui/icons-material/Style';
import TagIcon from '@mui/icons-material/Tag';
import TextsmsIcon from '@mui/icons-material/Textsms';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <StyleIcon />,
        label: 'Paraphrase',
        route: 'paraphrase',
    },
    {
        id: 1,
        icon: <TextsmsIcon />,
        label: 'Tweets',
        route: 'tweets',
    },
    {
        id: 2,
        icon: <TagIcon />,
        label: 'Hashtags',
        route: 'hashtags',
    },
]