import './assets/styles.css';

interface StatusHistoryObj {
    dateChanged: String,
    status: String
}

interface StatusHistoryI {
    classes?: string,
    history: [StatusHistoryObj]
}

const StatusHistory = ({ classes, history }: StatusHistoryI) => {
    return (
        <div className={`status-history-comp h-full flex flex-col ${classes ? classes : ''}`}>
            <h4 className='font-bold'>History</h4>
            <div className="status-history h-full flex justify-center">
                <div className="line" />
                <div className="stages-bg h-full flex flex-col justify-between items-center">
                    {history && history.map(({ status }) => {
                        let bgColorClass, textColorClass, borderColorClass;
                        switch (status) {
                            case 'applied': {
                                bgColorClass = 'bg-green-100';
                                textColorClass = 'text-green-800'
                                borderColorClass = 'border-green-800'
                                break;
                            }
                            case 'preparing': {
                                bgColorClass = 'bg-gray-100';
                                textColorClass = 'text-gray-800'
                                borderColorClass = 'border-gray-800'
                                break;
                            }
                            case 'rejected': {
                                bgColorClass = 'bg-red-100';
                                textColorClass = 'text-red-800'
                                borderColorClass = 'border-red-800'
                                break;
                            }
                            case 'phone screen': {
                                bgColorClass = 'bg-blue-100';
                                textColorClass = 'text-blue-800'
                                borderColorClass = 'border-blue-800'
                                break;
                            }
                            case 'technical': {
                                bgColorClass = 'bg-orange-100';
                                textColorClass = 'text-orange-800'
                                borderColorClass = 'border-orange-800'
                                break;
                            }
                            case 'first interview': {
                                bgColorClass = 'bg-purple-100';
                                textColorClass = 'text-purple-800';
                                borderColorClass = 'border-purple-800';
                                break;
                            }
                            case 'offer': {
                                bgColorClass = 'bg-yellow-100';
                                textColorClass = 'text-yellow-800';
                                borderColorClass = 'border-yellow-800';
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        return (
                            <div className="stage" data-name={status.split(' ').join('-')}>
                                <div className={`circle flex justify-center items-center ${bgColorClass} ${textColorClass} ${borderColorClass}`}>{status[0].toUpperCase()}</div>
                            </div>
                        )
                    })}
                    {history && history[history.length - 1].status !== 'offer' && history[history.length - 1].status !== 'rejected' && (
                        <div className="stage" data-name='unknown'>
                            <div className="circle flex justify-center items-center bg-white">?</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusHistory;