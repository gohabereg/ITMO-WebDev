<h1><?= $title ?></h1>
<?php foreach($content->blocks as $block): ?>
    <p><?=$block->data->text?></p>
<?php endforeach; ?>