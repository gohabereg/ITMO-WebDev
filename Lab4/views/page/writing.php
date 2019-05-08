<?php
    use yii\helpers\Url;
?>

<div class="container editor-container">
    <input class="title" id="title" placeholder="Заголовок" type="text" />
    <div id="editorjs"></div>
    <button id="save-btn">Сохранить</button>
</div>
<script>
    window.addEventListener('DOMContentLoaded', () => {
        const editor = new EditorJS();

        const btn = document.getElementById('save-btn');
        const title = document.getElementById('title');

        const csrfParam = document.getElementsByName('csrf-param')[0].content;
        const csrfToken = document.getElementsByName('csrf-token')[0].content;

        btn.addEventListener('click', async () => {
            const formData = new FormData();

            const content = await editor.save();
            try {
                const response = await fetch('<?=Url::to(['page/save'])?>' , {
                    method: 'post',
                    body: JSON.stringify({
                        title: title.value,
                        content: JSON.stringify(content),
                        [csrfParam]: csrfToken
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const json = await response.json();
                window.location.href = `<?=Url::to(['page/show']);?>&id=${json.id}`;
            } catch (e) {
                alert('Error while saving the page');
            }
        })
    });
</script>

<style>
    .title {
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
        font-size: 24px;
    }

    .editor-container {
        width: 600px;
    }
</style>