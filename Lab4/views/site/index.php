<?php

/* @var $this yii\web\View */

use yii\helpers\Url;

$this->title = 'Blog';
?>

<script>
    async function remove(id) {
        try {
            await fetch(`<?=Url::toRoute(['page/remove']);?>&id=${id}`);

            const el = document.getElementById(id);

            el.remove();
        } catch (e) {} 
    }
</script>

<h1>Articles: </h1>

<?php foreach($pages as $page): ?>
    <div id="<?=$page->id?>" class="option">
        <a href="<?=Url::toRoute(['page/show', 'id' => $page->id])?>"> 
            <h3><?=$page->title;?></h3>
        </a>

        <button class="delete-btn" onClick="remove(<?=$page->id?>)">Delete</button>
    </div>
<?php endforeach ?>

<style>
    .option {
        display: flex;
        align-items: center;
        padding: 5px;
        border-width: 1px 0 1px;
        border-color: #000;
        border-style: solid; 
    }

    .delete-btn {
        margin-left: auto;
        height: 25px;
    }
</style>