from fastapi import APIRouter

"""
    Describe the parameters of this api file
"""
router = APIRouter(
    prefix='/api',
    tags = ['api']
)

@router.get("")
async def identify_best_wine():
    """
        Send the characteristic of the best wine found by the model
    """
    return {"result" : "ok"}