<?php

namespace App\Enums;

enum EventType: string
{
    case ListingView = 'listing_view';
    case FavoriteAdded = 'favorite_added';
    case ProductViewed = 'product_viewed';
    case LeadCreated = 'lead_created';
    case MessageSent = 'message_sent';
    case SearchPerformed = 'search_performed';
}
