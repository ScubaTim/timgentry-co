import { Button } from 'reactstrap';
import useCopyToClipboard from '../utils/useCopyToClipboard';

const ClipboardCopyBtn = (text, block) => {
    const [isCopied, handleCopy] = useCopyToClipboard();

    if (block) {
        return (
            <Button outline block onClick={() => handleCopy(text)}>
                {isCopied ? 'COPIED TO CLIPBOARD' : 'MAIL@TIMGENTRY.DEV'}
            </Button>
        )
    }

    return (
        <Button outline onClick={() => handleCopy(text)}>
            {isCopied ? 'COPIED TO CLIPBOARD' : 'MAIL@TIMGENTRY.DEV'}
        </Button>
    );
};

export default ClipboardCopyBtn;