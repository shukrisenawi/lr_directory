<?php

namespace App\Enums;

enum UserRole: string
{
    case Normal = 'normal';
    case Company = 'company';
    case Admin = 'admin';
}
