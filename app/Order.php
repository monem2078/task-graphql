<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'product_id'
    ];

    /**
     * Return the user who make this order.
     *
     * @return 'App\User'
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
    * Return the product of this order.
    *
    * @return 'App\Product'
    */
    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
