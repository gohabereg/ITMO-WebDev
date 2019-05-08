<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Page extends ActiveRecord
{
    public static function tableName() {
        return 'page';
    }
}