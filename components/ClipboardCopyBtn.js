import { Button } from 'reactstrap';
import useCopyToClipboard from '../utils/useCopyToClipboard';

const ClipboardCopyBtn = (text, block) => {
    const [isCopied, handleCopy] = useCopyToClipboard();

    if (block) {
        return (
            <Button outline block onClick={() => handleCopy(text)}>
                {isCopied ? 'Copied to Clipboard' : 'Mail@Timgentry.co'}
            </Button>
        )
    }

    return (
        <Button outline onClick={() => handleCopy(text)}>
            {isCopied ? 'Copied to Clipboard' : 'Mail@Timgentry.co'}
        </Button>
    );
};

export default ClipboardCopyBtn;