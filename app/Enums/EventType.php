<?php

namespace App\Enums;

enum EventType: string
{
    case ListingView = 'listing_view';
    case FavoriteAdded = 'favorite_added';
}
