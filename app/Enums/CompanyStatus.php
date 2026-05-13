<?php

namespace App\Enums;

enum CompanyStatus: string
{
    case Unclaimed = 'unclaimed';
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';
}
